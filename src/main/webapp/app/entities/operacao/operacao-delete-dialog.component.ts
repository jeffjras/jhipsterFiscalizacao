import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from './operacao.service';

@Component({
    selector: 'jhi-operacao-delete-dialog',
    templateUrl: './operacao-delete-dialog.component.html'
})
export class OperacaoDeleteDialogComponent {
    operacao: IOperacao;

    constructor(private operacaoService: OperacaoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.operacaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'operacaoListModification',
                content: 'Deleted an operacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-operacao-delete-popup',
    template: ''
})
export class OperacaoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ operacao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OperacaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.operacao = operacao;
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
