package br.ufpa.eas.detran.web.rest;

import br.ufpa.eas.detran.JhipsterFiscalizacaoApp;

import br.ufpa.eas.detran.domain.Fiscalizacao;
import br.ufpa.eas.detran.repository.FiscalizacaoRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static br.ufpa.eas.detran.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufpa.eas.detran.domain.enumeration.SituacaoFiscalizacao;
/**
 * Test class for the FiscalizacaoResource REST controller.
 *
 * @see FiscalizacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterFiscalizacaoApp.class)
public class FiscalizacaoResourceIntTest {

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_REGISTRO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_REGISTRO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_OBSERVACAO = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACAO = "BBBBBBBBBB";

    private static final SituacaoFiscalizacao DEFAULT_SITUACAO = SituacaoFiscalizacao.ADIADA;
    private static final SituacaoFiscalizacao UPDATED_SITUACAO = SituacaoFiscalizacao.CANCELADA;

    @Autowired
    private FiscalizacaoRepository fiscalizacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFiscalizacaoMockMvc;

    private Fiscalizacao fiscalizacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FiscalizacaoResource fiscalizacaoResource = new FiscalizacaoResource(fiscalizacaoRepository);
        this.restFiscalizacaoMockMvc = MockMvcBuilders.standaloneSetup(fiscalizacaoResource)
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
    public static Fiscalizacao createEntity(EntityManager em) {
        Fiscalizacao fiscalizacao = new Fiscalizacao()
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM)
            .dataRegistro(DEFAULT_DATA_REGISTRO)
            .observacao(DEFAULT_OBSERVACAO)
            .situacao(DEFAULT_SITUACAO);
        return fiscalizacao;
    }

    @Before
    public void initTest() {
        fiscalizacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createFiscalizacao() throws Exception {
        int databaseSizeBeforeCreate = fiscalizacaoRepository.findAll().size();

        // Create the Fiscalizacao
        restFiscalizacaoMockMvc.perform(post("/api/fiscalizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalizacao)))
            .andExpect(status().isCreated());

        // Validate the Fiscalizacao in the database
        List<Fiscalizacao> fiscalizacaoList = fiscalizacaoRepository.findAll();
        assertThat(fiscalizacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Fiscalizacao testFiscalizacao = fiscalizacaoList.get(fiscalizacaoList.size() - 1);
        assertThat(testFiscalizacao.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testFiscalizacao.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
        assertThat(testFiscalizacao.getDataRegistro()).isEqualTo(DEFAULT_DATA_REGISTRO);
        assertThat(testFiscalizacao.getObservacao()).isEqualTo(DEFAULT_OBSERVACAO);
        assertThat(testFiscalizacao.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
    }

    @Test
    @Transactional
    public void createFiscalizacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fiscalizacaoRepository.findAll().size();

        // Create the Fiscalizacao with an existing ID
        fiscalizacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFiscalizacaoMockMvc.perform(post("/api/fiscalizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalizacao)))
            .andExpect(status().isBadRequest());

        // Validate the Fiscalizacao in the database
        List<Fiscalizacao> fiscalizacaoList = fiscalizacaoRepository.findAll();
        assertThat(fiscalizacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFiscalizacaos() throws Exception {
        // Initialize the database
        fiscalizacaoRepository.saveAndFlush(fiscalizacao);

        // Get all the fiscalizacaoList
        restFiscalizacaoMockMvc.perform(get("/api/fiscalizacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fiscalizacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())))
            .andExpect(jsonPath("$.[*].dataRegistro").value(hasItem(DEFAULT_DATA_REGISTRO.toString())))
            .andExpect(jsonPath("$.[*].observacao").value(hasItem(DEFAULT_OBSERVACAO.toString())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getFiscalizacao() throws Exception {
        // Initialize the database
        fiscalizacaoRepository.saveAndFlush(fiscalizacao);

        // Get the fiscalizacao
        restFiscalizacaoMockMvc.perform(get("/api/fiscalizacaos/{id}", fiscalizacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fiscalizacao.getId().intValue()))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()))
            .andExpect(jsonPath("$.dataRegistro").value(DEFAULT_DATA_REGISTRO.toString()))
            .andExpect(jsonPath("$.observacao").value(DEFAULT_OBSERVACAO.toString()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFiscalizacao() throws Exception {
        // Get the fiscalizacao
        restFiscalizacaoMockMvc.perform(get("/api/fiscalizacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFiscalizacao() throws Exception {
        // Initialize the database
        fiscalizacaoRepository.saveAndFlush(fiscalizacao);

        int databaseSizeBeforeUpdate = fiscalizacaoRepository.findAll().size();

        // Update the fiscalizacao
        Fiscalizacao updatedFiscalizacao = fiscalizacaoRepository.findById(fiscalizacao.getId()).get();
        // Disconnect from session so that the updates on updatedFiscalizacao are not directly saved in db
        em.detach(updatedFiscalizacao);
        updatedFiscalizacao
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .dataRegistro(UPDATED_DATA_REGISTRO)
            .observacao(UPDATED_OBSERVACAO)
            .situacao(UPDATED_SITUACAO);

        restFiscalizacaoMockMvc.perform(put("/api/fiscalizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFiscalizacao)))
            .andExpect(status().isOk());

        // Validate the Fiscalizacao in the database
        List<Fiscalizacao> fiscalizacaoList = fiscalizacaoRepository.findAll();
        assertThat(fiscalizacaoList).hasSize(databaseSizeBeforeUpdate);
        Fiscalizacao testFiscalizacao = fiscalizacaoList.get(fiscalizacaoList.size() - 1);
        assertThat(testFiscalizacao.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testFiscalizacao.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
        assertThat(testFiscalizacao.getDataRegistro()).isEqualTo(UPDATED_DATA_REGISTRO);
        assertThat(testFiscalizacao.getObservacao()).isEqualTo(UPDATED_OBSERVACAO);
        assertThat(testFiscalizacao.getSituacao()).isEqualTo(UPDATED_SITUACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingFiscalizacao() throws Exception {
        int databaseSizeBeforeUpdate = fiscalizacaoRepository.findAll().size();

        // Create the Fiscalizacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFiscalizacaoMockMvc.perform(put("/api/fiscalizacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fiscalizacao)))
            .andExpect(status().isBadRequest());

        // Validate the Fiscalizacao in the database
        List<Fiscalizacao> fiscalizacaoList = fiscalizacaoRepository.findAll();
        assertThat(fiscalizacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFiscalizacao() throws Exception {
        // Initialize the database
        fiscalizacaoRepository.saveAndFlush(fiscalizacao);

        int databaseSizeBeforeDelete = fiscalizacaoRepository.findAll().size();

        // Get the fiscalizacao
        restFiscalizacaoMockMvc.perform(delete("/api/fiscalizacaos/{id}", fiscalizacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fiscalizacao> fiscalizacaoList = fiscalizacaoRepository.findAll();
        assertThat(fiscalizacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fiscalizacao.class);
        Fiscalizacao fiscalizacao1 = new Fiscalizacao();
        fiscalizacao1.setId(1L);
        Fiscalizacao fiscalizacao2 = new Fiscalizacao();
        fiscalizacao2.setId(fiscalizacao1.getId());
        assertThat(fiscalizacao1).isEqualTo(fiscalizacao2);
        fiscalizacao2.setId(2L);
        assertThat(fiscalizacao1).isNotEqualTo(fiscalizacao2);
        fiscalizacao1.setId(null);
        assertThat(fiscalizacao1).isNotEqualTo(fiscalizacao2);
    }
}
