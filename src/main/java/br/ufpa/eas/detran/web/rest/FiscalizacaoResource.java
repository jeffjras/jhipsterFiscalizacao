package br.ufpa.eas.detran.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufpa.eas.detran.domain.Fiscalizacao;
import br.ufpa.eas.detran.repository.FiscalizacaoRepository;
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
 * REST controller for managing Fiscalizacao.
 */
@RestController
@RequestMapping("/api")
public class FiscalizacaoResource {

    private final Logger log = LoggerFactory.getLogger(FiscalizacaoResource.class);

    private static final String ENTITY_NAME = "fiscalizacao";

    private FiscalizacaoRepository fiscalizacaoRepository;

    public FiscalizacaoResource(FiscalizacaoRepository fiscalizacaoRepository) {
        this.fiscalizacaoRepository = fiscalizacaoRepository;
    }

    /**
     * POST  /fiscalizacaos : Create a new fiscalizacao.
     *
     * @param fiscalizacao the fiscalizacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fiscalizacao, or with status 400 (Bad Request) if the fiscalizacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fiscalizacaos")
    @Timed
    public ResponseEntity<Fiscalizacao> createFiscalizacao(@RequestBody Fiscalizacao fiscalizacao) throws URISyntaxException {
        log.debug("REST request to save Fiscalizacao : {}", fiscalizacao);
        if (fiscalizacao.getId() != null) {
            throw new BadRequestAlertException("A new fiscalizacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fiscalizacao result = fiscalizacaoRepository.save(fiscalizacao);
        return ResponseEntity.created(new URI("/api/fiscalizacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fiscalizacaos : Updates an existing fiscalizacao.
     *
     * @param fiscalizacao the fiscalizacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fiscalizacao,
     * or with status 400 (Bad Request) if the fiscalizacao is not valid,
     * or with status 500 (Internal Server Error) if the fiscalizacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fiscalizacaos")
    @Timed
    public ResponseEntity<Fiscalizacao> updateFiscalizacao(@RequestBody Fiscalizacao fiscalizacao) throws URISyntaxException {
        log.debug("REST request to update Fiscalizacao : {}", fiscalizacao);
        if (fiscalizacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fiscalizacao result = fiscalizacaoRepository.save(fiscalizacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fiscalizacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fiscalizacaos : get all the fiscalizacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fiscalizacaos in body
     */
    @GetMapping("/fiscalizacaos")
    @Timed
    public List<Fiscalizacao> getAllFiscalizacaos() {
        log.debug("REST request to get all Fiscalizacaos");
        return fiscalizacaoRepository.findAll();
    }

    /**
     * GET  /fiscalizacaos/:id : get the "id" fiscalizacao.
     *
     * @param id the id of the fiscalizacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fiscalizacao, or with status 404 (Not Found)
     */
    @GetMapping("/fiscalizacaos/{id}")
    @Timed
    public ResponseEntity<Fiscalizacao> getFiscalizacao(@PathVariable Long id) {
        log.debug("REST request to get Fiscalizacao : {}", id);
        Optional<Fiscalizacao> fiscalizacao = fiscalizacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fiscalizacao);
    }

    /**
     * DELETE  /fiscalizacaos/:id : delete the "id" fiscalizacao.
     *
     * @param id the id of the fiscalizacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fiscalizacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteFiscalizacao(@PathVariable Long id) {
        log.debug("REST request to delete Fiscalizacao : {}", id);

        fiscalizacaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
