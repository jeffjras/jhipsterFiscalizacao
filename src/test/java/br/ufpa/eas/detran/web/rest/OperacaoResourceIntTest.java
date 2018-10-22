package br.ufpa.eas.detran.web.rest;

import br.ufpa.eas.detran.JhipsterFiscalizacaoApp;

import br.ufpa.eas.detran.domain.Operacao;
import br.ufpa.eas.detran.repository.OperacaoRepository;
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

import br.ufpa.eas.detran.domain.enumeration.StatusOperacao;
/**
 * Test class for the OperacaoResource REST controller.
 *
 * @see OperacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterFiscalizacaoApp.class)
public class OperacaoResourceIntTest {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final StatusOperacao DEFAULT_STATUS = StatusOperacao.ABERTA;
    private static final StatusOperacao UPDATED_STATUS = StatusOperacao.PENDENTE;

    @Autowired
    private OperacaoRepository operacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOperacaoMockMvc;

    private Operacao operacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OperacaoResource operacaoResource = new OperacaoResource(operacaoRepository);
        this.restOperacaoMockMvc = MockMvcBuilders.standaloneSetup(operacaoResource)
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
    public static Operacao createEntity(EntityManager em) {
        Operacao operacao = new Operacao()
            .data(DEFAULT_DATA)
            .status(DEFAULT_STATUS);
        return operacao;
    }

    @Before
    public void initTest() {
        operacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createOperacao() throws Exception {
        int databaseSizeBeforeCreate = operacaoRepository.findAll().size();

        // Create the Operacao
        restOperacaoMockMvc.perform(post("/api/operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isCreated());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Operacao testOperacao = operacaoList.get(operacaoList.size() - 1);
        assertThat(testOperacao.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testOperacao.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createOperacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = operacaoRepository.findAll().size();

        // Create the Operacao with an existing ID
        operacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperacaoMockMvc.perform(post("/api/operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isBadRequest());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOperacaos() throws Exception {
        // Initialize the database
        operacaoRepository.saveAndFlush(operacao);

        // Get all the operacaoList
        restOperacaoMockMvc.perform(get("/api/operacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getOperacao() throws Exception {
        // Initialize the database
        operacaoRepository.saveAndFlush(operacao);

        // Get the operacao
        restOperacaoMockMvc.perform(get("/api/operacaos/{id}", operacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(operacao.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOperacao() throws Exception {
        // Get the operacao
        restOperacaoMockMvc.perform(get("/api/operacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOperacao() throws Exception {
        // Initialize the database
        operacaoRepository.saveAndFlush(operacao);

        int databaseSizeBeforeUpdate = operacaoRepository.findAll().size();

        // Update the operacao
        Operacao updatedOperacao = operacaoRepository.findById(operacao.getId()).get();
        // Disconnect from session so that the updates on updatedOperacao are not directly saved in db
        em.detach(updatedOperacao);
        updatedOperacao
            .data(UPDATED_DATA)
            .status(UPDATED_STATUS);

        restOperacaoMockMvc.perform(put("/api/operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOperacao)))
            .andExpect(status().isOk());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeUpdate);
        Operacao testOperacao = operacaoList.get(operacaoList.size() - 1);
        assertThat(testOperacao.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testOperacao.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingOperacao() throws Exception {
        int databaseSizeBeforeUpdate = operacaoRepository.findAll().size();

        // Create the Operacao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperacaoMockMvc.perform(put("/api/operacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operacao)))
            .andExpect(status().isBadRequest());

        // Validate the Operacao in the database
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOperacao() throws Exception {
        // Initialize the database
        operacaoRepository.saveAndFlush(operacao);

        int databaseSizeBeforeDelete = operacaoRepository.findAll().size();

        // Get the operacao
        restOperacaoMockMvc.perform(delete("/api/operacaos/{id}", operacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Operacao> operacaoList = operacaoRepository.findAll();
        assertThat(operacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operacao.class);
        Operacao operacao1 = new Operacao();
        operacao1.setId(1L);
        Operacao operacao2 = new Operacao();
        operacao2.setId(operacao1.getId());
        assertThat(operacao1).isEqualTo(operacao2);
        operacao2.setId(2L);
        assertThat(operacao1).isNotEqualTo(operacao2);
        operacao1.setId(null);
        assertThat(operacao1).isNotEqualTo(operacao2);
    }
}
