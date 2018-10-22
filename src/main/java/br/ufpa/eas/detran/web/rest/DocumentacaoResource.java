package br.ufpa.eas.detran.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufpa.eas.detran.domain.Documentacao;
import br.ufpa.eas.detran.repository.DocumentacaoRepository;
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
 * REST controller for managing Documentacao.
 */
@RestController
@RequestMapping("/api")
public class DocumentacaoResource {

    private final Logger log = LoggerFactory.getLogger(DocumentacaoResource.class);

    private static final String ENTITY_NAME = "documentacao";

    private DocumentacaoRepository documentacaoRepository;

    public DocumentacaoResource(DocumentacaoRepository documentacaoRepository) {
        this.documentacaoRepository = documentacaoRepository;
    }

    /**
     * POST  /documentacaos : Create a new documentacao.
     *
     * @param documentacao the documentacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentacao, or with status 400 (Bad Request) if the documentacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documentacaos")
    @Timed
    public ResponseEntity<Documentacao> createDocumentacao(@RequestBody Documentacao documentacao) throws URISyntaxException {
        log.debug("REST request to save Documentacao : {}", documentacao);
        if (documentacao.getId() != null) {
            throw new BadRequestAlertException("A new documentacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Documentacao result = documentacaoRepository.save(documentacao);
        return ResponseEntity.created(new URI("/api/documentacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documentacaos : Updates an existing documentacao.
     *
     * @param documentacao the documentacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentacao,
     * or with status 400 (Bad Request) if the documentacao is not valid,
     * or with status 500 (Internal Server Error) if the documentacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documentacaos")
    @Timed
    public ResponseEntity<Documentacao> updateDocumentacao(@RequestBody Documentacao documentacao) throws URISyntaxException {
        log.debug("REST request to update Documentacao : {}", documentacao);
        if (documentacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Documentacao result = documentacaoRepository.save(documentacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documentacaos : get all the documentacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentacaos in body
     */
    @GetMapping("/documentacaos")
    @Timed
    public List<Documentacao> getAllDocumentacaos() {
        log.debug("REST request to get all Documentacaos");
        return documentacaoRepository.findAll();
    }

    /**
     * GET  /documentacaos/:id : get the "id" documentacao.
     *
     * @param id the id of the documentacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentacao, or with status 404 (Not Found)
     */
    @GetMapping("/documentacaos/{id}")
    @Timed
    public ResponseEntity<Documentacao> getDocumentacao(@PathVariable Long id) {
        log.debug("REST request to get Documentacao : {}", id);
        Optional<Documentacao> documentacao = documentacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentacao);
    }

    /**
     * DELETE  /documentacaos/:id : delete the "id" documentacao.
     *
     * @param id the id of the documentacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documentacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteDocumentacao(@PathVariable Long id) {
        log.debug("REST request to delete Documentacao : {}", id);

        documentacaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
