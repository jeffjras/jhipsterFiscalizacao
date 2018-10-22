package br.ufpa.eas.detran.web.rest;

import br.ufpa.eas.detran.JhipsterFiscalizacaoApp;

import br.ufpa.eas.detran.domain.Condutor;
import br.ufpa.eas.detran.repository.CondutorRepository;
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

/**
 * Test class for the CondutorResource REST controller.
 *
 * @see CondutorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterFiscalizacaoApp.class)
public class CondutorResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    @Autowired
    private CondutorRepository condutorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCondutorMockMvc;

    private Condutor condutor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CondutorResource condutorResource = new CondutorResource(condutorRepository);
        this.restCondutorMockMvc = MockMvcBuilders.standaloneSetup(condutorResource)
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
    public static Condutor createEntity(EntityManager em) {
        Condutor condutor = new Condutor()
            .nome(DEFAULT_NOME)
            .endereco(DEFAULT_ENDERECO)
            .telefone(DEFAULT_TELEFONE);
        return condutor;
    }

    @Before
    public void initTest() {
        condutor = createEntity(em);
    }

    @Test
    @Transactional
    public void createCondutor() throws Exception {
        int databaseSizeBeforeCreate = condutorRepository.findAll().size();

        // Create the Condutor
        restCondutorMockMvc.perform(post("/api/condutors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(condutor)))
            .andExpect(status().isCreated());

        // Validate the Condutor in the database
        List<Condutor> condutorList = condutorRepository.findAll();
        assertThat(condutorList).hasSize(databaseSizeBeforeCreate + 1);
        Condutor testCondutor = condutorList.get(condutorList.size() - 1);
        assertThat(testCondutor.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCondutor.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testCondutor.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
    }

    @Test
    @Transactional
    public void createCondutorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = condutorRepository.findAll().size();

        // Create the Condutor with an existing ID
        condutor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCondutorMockMvc.perform(post("/api/condutors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(condutor)))
            .andExpect(status().isBadRequest());

        // Validate the Condutor in the database
        List<Condutor> condutorList = condutorRepository.findAll();
        assertThat(condutorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCondutors() throws Exception {
        // Initialize the database
        condutorRepository.saveAndFlush(condutor);

        // Get all the condutorList
        restCondutorMockMvc.perform(get("/api/condutors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(condutor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())));
    }
    
    @Test
    @Transactional
    public void getCondutor() throws Exception {
        // Initialize the database
        condutorRepository.saveAndFlush(condutor);

        // Get the condutor
        restCondutorMockMvc.perform(get("/api/condutors/{id}", condutor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(condutor.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCondutor() throws Exception {
        // Get the condutor
        restCondutorMockMvc.perform(get("/api/condutors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCondutor() throws Exception {
        // Initialize the database
        condutorRepository.saveAndFlush(condutor);

        int databaseSizeBeforeUpdate = condutorRepository.findAll().size();

        // Update the condutor
        Condutor updatedCondutor = condutorRepository.findById(condutor.getId()).get();
        // Disconnect from session so that the updates on updatedCondutor are not directly saved in db
        em.detach(updatedCondutor);
        updatedCondutor
            .nome(UPDATED_NOME)
            .endereco(UPDATED_ENDERECO)
            .telefone(UPDATED_TELEFONE);

        restCondutorMockMvc.perform(put("/api/condutors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCondutor)))
            .andExpect(status().isOk());

        // Validate the Condutor in the database
        List<Condutor> condutorList = condutorRepository.findAll();
        assertThat(condutorList).hasSize(databaseSizeBeforeUpdate);
        Condutor testCondutor = condutorList.get(condutorList.size() - 1);
        assertThat(testCondutor.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCondutor.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testCondutor.getTelefone()).isEqualTo(UPDATED_TELEFONE);
    }

    @Test
    @Transactional
    public void updateNonExistingCondutor() throws Exception {
        int databaseSizeBeforeUpdate = condutorRepository.findAll().size();

        // Create the Condutor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCondutorMockMvc.perform(put("/api/condutors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(condutor)))
            .andExpect(status().isBadRequest());

        // Validate the Condutor in the database
        List<Condutor> condutorList = condutorRepository.findAll();
        assertThat(condutorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCondutor() throws Exception {
        // Initialize the database
        condutorRepository.saveAndFlush(condutor);

        int databaseSizeBeforeDelete = condutorRepository.findAll().size();

        // Get the condutor
        restCondutorMockMvc.perform(delete("/api/condutors/{id}", condutor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Condutor> condutorList = condutorRepository.findAll();
        assertThat(condutorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Condutor.class);
        Condutor condutor1 = new Condutor();
        condutor1.setId(1L);
        Condutor condutor2 = new Condutor();
        condutor2.setId(condutor1.getId());
        assertThat(condutor1).isEqualTo(condutor2);
        condutor2.setId(2L);
        assertThat(condutor1).isNotEqualTo(condutor2);
        condutor1.setId(null);
        assertThat(condutor1).isNotEqualTo(condutor2);
    }
}
