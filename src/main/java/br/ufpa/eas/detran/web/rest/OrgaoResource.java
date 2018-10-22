package br.ufpa.eas.detran.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufpa.eas.detran.domain.Orgao;
import br.ufpa.eas.detran.repository.OrgaoRepository;
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
 * REST controller for managing Orgao.
 */
@RestController
@RequestMapping("/api")
public class OrgaoResource {

    private final Logger log = LoggerFactory.getLogger(OrgaoResource.class);

    private static final String ENTITY_NAME = "orgao";

    private OrgaoRepository orgaoRepository;

    public OrgaoResource(OrgaoRepository orgaoRepository) {
        this.orgaoRepository = orgaoRepository;
    }

    /**
     * POST  /orgaos : Create a new orgao.
     *
     * @param orgao the orgao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orgao, or with status 400 (Bad Request) if the orgao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/orgaos")
    @Timed
    public ResponseEntity<Orgao> createOrgao(@RequestBody Orgao orgao) throws URISyntaxException {
        log.debug("REST request to save Orgao : {}", orgao);
        if (orgao.getId() != null) {
            throw new BadRequestAlertException("A new orgao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Orgao result = orgaoRepository.save(orgao);
        return ResponseEntity.created(new URI("/api/orgaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /orgaos : Updates an existing orgao.
     *
     * @param orgao the orgao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orgao,
     * or with status 400 (Bad Request) if the orgao is not valid,
     * or with status 500 (Internal Server Error) if the orgao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/orgaos")
    @Timed
    public ResponseEntity<Orgao> updateOrgao(@RequestBody Orgao orgao) throws URISyntaxException {
        log.debug("REST request to update Orgao : {}", orgao);
        if (orgao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Orgao result = orgaoRepository.save(orgao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orgao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /orgaos : get all the orgaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orgaos in body
     */
    @GetMapping("/orgaos")
    @Timed
    public List<Orgao> getAllOrgaos() {
        log.debug("REST request to get all Orgaos");
        return orgaoRepository.findAll();
    }

    /**
     * GET  /orgaos/:id : get the "id" orgao.
     *
     * @param id the id of the orgao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orgao, or with status 404 (Not Found)
     */
    @GetMapping("/orgaos/{id}")
    @Timed
    public ResponseEntity<Orgao> getOrgao(@PathVariable Long id) {
        log.debug("REST request to get Orgao : {}", id);
        Optional<Orgao> orgao = orgaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orgao);
    }

    /**
     * DELETE  /orgaos/:id : delete the "id" orgao.
     *
     * @param id the id of the orgao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/orgaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrgao(@PathVariable Long id) {
        log.debug("REST request to delete Orgao : {}", id);

        orgaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
