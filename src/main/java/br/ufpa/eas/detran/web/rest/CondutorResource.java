package br.ufpa.eas.detran.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufpa.eas.detran.domain.Condutor;
import br.ufpa.eas.detran.repository.CondutorRepository;
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
 * REST controller for managing Condutor.
 */
@RestController
@RequestMapping("/api")
public class CondutorResource {

    private final Logger log = LoggerFactory.getLogger(CondutorResource.class);

    private static final String ENTITY_NAME = "condutor";

    private CondutorRepository condutorRepository;

    public CondutorResource(CondutorRepository condutorRepository) {
        this.condutorRepository = condutorRepository;
    }

    /**
     * POST  /condutors : Create a new condutor.
     *
     * @param condutor the condutor to create
     * @return the ResponseEntity with status 201 (Created) and with body the new condutor, or with status 400 (Bad Request) if the condutor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/condutors")
    @Timed
    public ResponseEntity<Condutor> createCondutor(@RequestBody Condutor condutor) throws URISyntaxException {
        log.debug("REST request to save Condutor : {}", condutor);
        if (condutor.getId() != null) {
            throw new BadRequestAlertException("A new condutor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Condutor result = condutorRepository.save(condutor);
        return ResponseEntity.created(new URI("/api/condutors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /condutors : Updates an existing condutor.
     *
     * @param condutor the condutor to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated condutor,
     * or with status 400 (Bad Request) if the condutor is not valid,
     * or with status 500 (Internal Server Error) if the condutor couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/condutors")
    @Timed
    public ResponseEntity<Condutor> updateCondutor(@RequestBody Condutor condutor) throws URISyntaxException {
        log.debug("REST request to update Condutor : {}", condutor);
        if (condutor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Condutor result = condutorRepository.save(condutor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, condutor.getId().toString()))
            .body(result);
    }

    /**
     * GET  /condutors : get all the condutors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of condutors in body
     */
    @GetMapping("/condutors")
    @Timed
    public List<Condutor> getAllCondutors() {
        log.debug("REST request to get all Condutors");
        return condutorRepository.findAll();
    }

    /**
     * GET  /condutors/:id : get the "id" condutor.
     *
     * @param id the id of the condutor to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the condutor, or with status 404 (Not Found)
     */
    @GetMapping("/condutors/{id}")
    @Timed
    public ResponseEntity<Condutor> getCondutor(@PathVariable Long id) {
        log.debug("REST request to get Condutor : {}", id);
        Optional<Condutor> condutor = condutorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(condutor);
    }

    /**
     * DELETE  /condutors/:id : delete the "id" condutor.
     *
     * @param id the id of the condutor to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/condutors/{id}")
    @Timed
    public ResponseEntity<Void> deleteCondutor(@PathVariable Long id) {
        log.debug("REST request to delete Condutor : {}", id);

        condutorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
