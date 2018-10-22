package br.ufpa.eas.detran.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufpa.eas.detran.domain.Cargo;
import br.ufpa.eas.detran.repository.CargoRepository;
import br.ufpa.eas.detran.web.rest.errors.BadRequestAlertException;
import br.ufpa.eas.detran.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cargo.
 */
@RestController
@RequestMapping("/api")
public class CargoResource {

    private final Logger log = LoggerFactory.getLogger(CargoResource.class);

    private static final String ENTITY_NAME = "cargo";

    private CargoRepository cargoRepository;

    public CargoResource(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    /**
     * POST  /cargos : Create a new cargo.
     *
     * @param cargo the cargo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cargo, or with status 400 (Bad Request) if the cargo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cargos")
    @Timed
    public ResponseEntity<Cargo> createCargo(@RequestBody Cargo cargo) throws URISyntaxException {
        log.debug("REST request to save Cargo : {}", cargo);
        if (cargo.getId() != null) {
            throw new BadRequestAlertException("A new cargo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cargo result = cargoRepository.save(cargo);
        return ResponseEntity.created(new URI("/api/cargos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cargos : Updates an existing cargo.
     *
     * @param cargo the cargo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cargo,
     * or with status 400 (Bad Request) if the cargo is not valid,
     * or with status 500 (Internal Server Error) if the cargo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cargos")
    @Timed
    public ResponseEntity<Cargo> updateCargo(@RequestBody Cargo cargo) throws URISyntaxException {
        log.debug("REST request to update Cargo : {}", cargo);
        if (cargo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cargo result = cargoRepository.save(cargo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cargo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cargos : get all the cargos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cargos in body
     */
    @GetMapping("/cargos")
    @Timed
    public List<Cargo> getAllCargos() {
        log.debug("REST request to get all Cargos");
        return cargoRepository.findAll();
    }

    /**
     * GET  /cargos/:id : get the "id" cargo.
     *
     * @param id the id of the cargo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cargo, or with status 404 (Not Found)
     */
    @GetMapping("/cargos/{id}")
    @Timed
    public ResponseEntity<Cargo> getCargo(@PathVariable Long id) {
        log.debug("REST request to get Cargo : {}", id);
        Optional<Cargo> cargo = cargoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cargo);
    }

    /**
     * DELETE  /cargos/:id : delete the "id" cargo.
     *
     * @param id the id of the cargo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cargos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCargo(@PathVariable Long id) {
        log.debug("REST request to delete Cargo : {}", id);

        cargoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
