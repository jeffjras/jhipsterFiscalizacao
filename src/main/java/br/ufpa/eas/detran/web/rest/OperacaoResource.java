package br.ufpa.eas.detran.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufpa.eas.detran.domain.Operacao;
import br.ufpa.eas.detran.repository.OperacaoRepository;
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
 * REST controller for managing Operacao.
 */
@RestController
@RequestMapping("/api")
public class OperacaoResource {

    private final Logger log = LoggerFactory.getLogger(OperacaoResource.class);

    private static final String ENTITY_NAME = "operacao";

    private OperacaoRepository operacaoRepository;

    public OperacaoResource(OperacaoRepository operacaoRepository) {
        this.operacaoRepository = operacaoRepository;
    }

    /**
     * POST  /operacaos : Create a new operacao.
     *
     * @param operacao the operacao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new operacao, or with status 400 (Bad Request) if the operacao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/operacaos")
    @Timed
    public ResponseEntity<Operacao> createOperacao(@RequestBody Operacao operacao) throws URISyntaxException {
        log.debug("REST request to save Operacao : {}", operacao);
        if (operacao.getId() != null) {
            throw new BadRequestAlertException("A new operacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Operacao result = operacaoRepository.save(operacao);
        return ResponseEntity.created(new URI("/api/operacaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /operacaos : Updates an existing operacao.
     *
     * @param operacao the operacao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated operacao,
     * or with status 400 (Bad Request) if the operacao is not valid,
     * or with status 500 (Internal Server Error) if the operacao couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/operacaos")
    @Timed
    public ResponseEntity<Operacao> updateOperacao(@RequestBody Operacao operacao) throws URISyntaxException {
        log.debug("REST request to update Operacao : {}", operacao);
        if (operacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Operacao result = operacaoRepository.save(operacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, operacao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /operacaos : get all the operacaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of operacaos in body
     */
    @GetMapping("/operacaos")
    @Timed
    public List<Operacao> getAllOperacaos() {
        log.debug("REST request to get all Operacaos");
        return operacaoRepository.findAll();
    }

    /**
     * GET  /operacaos/:id : get the "id" operacao.
     *
     * @param id the id of the operacao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the operacao, or with status 404 (Not Found)
     */
    @GetMapping("/operacaos/{id}")
    @Timed
    public ResponseEntity<Operacao> getOperacao(@PathVariable Long id) {
        log.debug("REST request to get Operacao : {}", id);
        Optional<Operacao> operacao = operacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(operacao);
    }

    /**
     * DELETE  /operacaos/:id : delete the "id" operacao.
     *
     * @param id the id of the operacao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/operacaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteOperacao(@PathVariable Long id) {
        log.debug("REST request to delete Operacao : {}", id);

        operacaoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
