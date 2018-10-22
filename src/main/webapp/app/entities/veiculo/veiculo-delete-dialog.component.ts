import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVeiculo } from 'app/shared/model/veiculo.model';
import { VeiculoService } from './veiculo.service';

@Component({
    selector: 'jhi-veiculo-delete-dialog',
    templateUrl: './veiculo-delete-dialog.component.html'
})
export class VeiculoDeleteDialogComponent {
    veiculo: IVeiculo;

    constructor(private veiculoService: VeiculoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.veiculoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'veiculoListModification',
                content: 'Deleted an veiculo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-veiculo-delete-popup',
    template: ''
})
export class VeiculoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ veiculo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VeiculoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.veiculo = veiculo;
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
