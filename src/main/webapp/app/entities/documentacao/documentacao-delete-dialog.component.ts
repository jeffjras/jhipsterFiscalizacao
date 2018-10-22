import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentacao } from 'app/shared/model/documentacao.model';
import { DocumentacaoService } from './documentacao.service';

@Component({
    selector: 'jhi-documentacao-delete-dialog',
    templateUrl: './documentacao-delete-dialog.component.html'
})
export class DocumentacaoDeleteDialogComponent {
    documentacao: IDocumentacao;

    constructor(
        private documentacaoService: DocumentacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentacaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentacaoListModification',
                content: 'Deleted an documentacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documentacao-delete-popup',
    template: ''
})
export class DocumentacaoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentacao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentacaoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documentacao = documentacao;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
