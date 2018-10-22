package br.ufpa.eas.detran.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufpa.eas.detran.domain.Veiculo;
import br.ufpa.eas.detran.repository.VeiculoRepository;
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
 * REST controller for managing Veiculo.
 */
@RestController
@RequestMapping("/api")
public class VeiculoResource {

    private final Logger log = LoggerFactory.getLogger(VeiculoResource.class);

    private static final String ENTITY_NAME = "veiculo";

    private VeiculoRepository veiculoRepository;

    public VeiculoResource(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    /**
     * POST  /veiculos : Create a new veiculo.
     *
     * @param veiculo the veiculo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new veiculo, or with status 400 (Bad Request) if the veiculo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/veiculos")
    @Timed
    public ResponseEntity<Veiculo> createVeiculo(@RequestBody Veiculo veiculo) throws URISyntaxException {
        log.debug("REST request to save Veiculo : {}", veiculo);
        if (veiculo.getId() != null) {
            throw new BadRequestAlertException("A new veiculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Veiculo result = veiculoRepository.save(veiculo);
        return ResponseEntity.created(new URI("/api/veiculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /veiculos : Updates an existing veiculo.
     *
     * @param veiculo the veiculo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated veiculo,
     * or with status 400 (Bad Request) if the veiculo is not valid,
     * or with status 500 (Internal Server Error) if the veiculo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/veiculos")
    @Timed
    public ResponseEntity<Veiculo> updateVeiculo(@RequestBody Veiculo veiculo) throws URISyntaxException {
        log.debug("REST request to update Veiculo : {}", veiculo);
        if (veiculo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Veiculo result = veiculoRepository.save(veiculo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, veiculo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /veiculos : get all the veiculos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of veiculos in body
     */
    @GetMapping("/veiculos")
    @Timed
    public List<Veiculo> getAllVeiculos() {
        log.debug("REST request to get all Veiculos");
        return veiculoRepository.findAll();
    }

    /**
     * GET  /veiculos/:id : get the "id" veiculo.
     *
     * @param id the id of the veiculo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the veiculo, or with status 404 (Not Found)
     */
    @GetMapping("/veiculos/{id}")
    @Timed
    public ResponseEntity<Veiculo> getVeiculo(@PathVariable Long id) {
        log.debug("REST request to get Veiculo : {}", id);
        Optional<Veiculo> veiculo = veiculoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(veiculo);
    }

    /**
     * DELETE  /veiculos/:id : delete the "id" veiculo.
     *
     * @param id the id of the veiculo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/veiculos/{id}")
    @Timed
    public ResponseEntity<Void> deleteVeiculo(@PathVariable Long id) {
        log.debug("REST request to delete Veiculo : {}", id);

        veiculoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
