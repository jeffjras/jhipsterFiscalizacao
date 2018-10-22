package br.ufpa.eas.detran.web.rest;

import br.ufpa.eas.detran.JhipsterFiscalizacaoApp;

import br.ufpa.eas.detran.domain.Documentacao;
import br.ufpa.eas.detran.repository.DocumentacaoRepository;
import br.ufpa.eas.detran.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static br.ufpa.eas.detran.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufpa.eas.detran.domain.enumeration.TipoDocumentacao;
/**
 * Test class for the DocumentacaoResource REST controller.
 *
 * @see DocumentacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterFiscalizacaoApp.class)
public class DocumentacaoResourceIntTest {

    private static final TipoDocumentacao DEFAULT_TIPO = TipoDocumentacao.CNH;
    private static final TipoDocumentacao UPDATED_TIPO = TipoDocumentacao.CRV;

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private DocumentacaoRepository documentacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentacaoMockMvc;

    private Documentacao documentacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentacaoResource documentacaoResource = new DocumentacaoResource(documentacaoRepository);
        this.restDocumentacaoMockMvc = MockMvcBuilders.standaloneSetup(documentacaoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Documentacao createEntity(EntityManager em) {
        Documentacao documentacao = new Documentacao()
            .tipo(DEFAULT_TIPO)
            .descricao(DEFAULT_DESCRICAO);
        return documentacao;
    }

    @Before
    public void initTest() {
        documentacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentacao() throws Exception {
        int databaseSizeBeforeCreate = documentacaoRepository.findAll().size();

        // Create the Documentacao
        restDocumentacaoMockMvc.perform(post("/api/documentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentacao)))
            .andExpect(status().isCreated());

        // Validate the Documentacao in the database
        List<Documentacao> documentacaoList = documentacaoRepository.findAll();
        assertThat(documentacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Documentacao testDocumentacao = documentacaoList.get(documentacaoList.size() - 1);
        assertThat(testDocumentacao.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testDocumentacao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createDocumentacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentacaoRepository.findAll().size();

        // Create the Documentacao with an existing ID
        documentacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentacaoMockMvc.perform(post("/api/documentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentacao)))
            .andExpect(status().isBadRequest());

        // Validate the Documentacao in the database
        List<Documentacao> documentacaoList = documentacaoRepository.findAll();
        assertThat(documentacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentacaos() throws Exception {
        // Initialize the database
        documentacaoRepository.saveAndFlush(documentacao);

        // Get all the documentacaoList
        restDocumentacaoMockMvc.perform(get("/api/documentacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }
    
    @Test
    @Transactional
    public void getDocumentacao() throws Exception {
        // Initialize the database
        documentacaoRepository.saveAndFlush(documentacao);

        // Get the documentacao
        restDocumentacaoMockMvc.perform(get("/api/documentacaos/{id}", documentacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentacao.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentacao() throws Exception {
        // Get the documentacao
        restDocumentacaoMockMvc.perform(get("/api/documentacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentacao() throws Exception {
        // Initialize the database
        documentacaoRepository.saveAndFlush(documentacao);

        int databaseSizeBeforeUpdate = documentacaoRepository.findAll().size();

        // Update the documentacao
        Documentacao updatedDocumentacao = documentacaoRepository.findById(documentacao.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentacao are not directly saved in db
        em.detach(updatedDocumentacao);
        updatedDocumentacao
            .tipo(UPDATED_TIPO)
            .descricao(UPDATED_DESCRICAO);

        restDocumentacaoMockMvc.perform(put("/api/documentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentacao)))
            .andExpect(status().isOk());

        // Validate the Documentacao in the database
        List<Documentacao> documentacaoList = documentacaoRepository.findAll();
        assertThat(documentacaoList).hasSize(databaseSizeBeforeUpdate);
        Documentacao testDocumentacao = documentacaoList.get(documentacaoList.size() - 1);
        assertThat(testDocumentacao.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testDocumentacao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentacao() throws Exception {
        int databaseSizeBeforeUpdate = documentacaoRepository.findAll().size();

        // Create the Documentacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentacaoMockMvc.perform(put("/api/documentacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentacao)))
            .andExpect(status().isBadRequest());

        // Validate the Documentacao in the database
        List<Documentacao> documentacaoList = documentacaoRepository.findAll();
        assertThat(documentacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentacao() throws Exception {
        // Initialize the database
        documentacaoRepository.saveAndFlush(documentacao);

        int databaseSizeBeforeDelete = documentacaoRepository.findAll().size();

        // Get the documentacao
        restDocumentacaoMockMvc.perform(delete("/api/documentacaos/{id}", documentacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Documentacao> documentacaoList = documentacaoRepository.findAll();
        assertThat(documentacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Documentacao.class);
        Documentacao documentacao1 = new Documentacao();
        documentacao1.setId(1L);
        Documentacao documentacao2 = new Documentacao();
        documentacao2.setId(documentacao1.getId());
        assertThat(documentacao1).isEqualTo(documentacao2);
        documentacao2.setId(2L);
        assertThat(documentacao1).isNotEqualTo(documentacao2);
        documentacao1.setId(null);
        assertThat(documentacao1).isNotEqualTo(documentacao2);
    }
}
