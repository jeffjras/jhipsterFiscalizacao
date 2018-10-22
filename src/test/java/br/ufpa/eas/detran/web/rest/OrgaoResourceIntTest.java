package br.ufpa.eas.detran.web.rest;

import br.ufpa.eas.detran.JhipsterFiscalizacaoApp;

import br.ufpa.eas.detran.domain.Orgao;
import br.ufpa.eas.detran.repository.OrgaoRepository;
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
 * Test class for the OrgaoResource REST controller.
 *
 * @see OrgaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterFiscalizacaoApp.class)
public class OrgaoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    @Autowired
    private OrgaoRepository orgaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrgaoMockMvc;

    private Orgao orgao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrgaoResource orgaoResource = new OrgaoResource(orgaoRepository);
        this.restOrgaoMockMvc = MockMvcBuilders.standaloneSetup(orgaoResource)
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
    public static Orgao createEntity(EntityManager em) {
        Orgao orgao = new Orgao()
            .nome(DEFAULT_NOME)
            .endereco(DEFAULT_ENDERECO)
            .telefone(DEFAULT_TELEFONE);
        return orgao;
    }

    @Before
    public void initTest() {
        orgao = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrgao() throws Exception {
        int databaseSizeBeforeCreate = orgaoRepository.findAll().size();

        // Create the Orgao
        restOrgaoMockMvc.perform(post("/api/orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orgao)))
            .andExpect(status().isCreated());

        // Validate the Orgao in the database
        List<Orgao> orgaoList = orgaoRepository.findAll();
        assertThat(orgaoList).hasSize(databaseSizeBeforeCreate + 1);
        Orgao testOrgao = orgaoList.get(orgaoList.size() - 1);
        assertThat(testOrgao.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testOrgao.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testOrgao.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
    }

    @Test
    @Transactional
    public void createOrgaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orgaoRepository.findAll().size();

        // Create the Orgao with an existing ID
        orgao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrgaoMockMvc.perform(post("/api/orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orgao)))
            .andExpect(status().isBadRequest());

        // Validate the Orgao in the database
        List<Orgao> orgaoList = orgaoRepository.findAll();
        assertThat(orgaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrgaos() throws Exception {
        // Initialize the database
        orgaoRepository.saveAndFlush(orgao);

        // Get all the orgaoList
        restOrgaoMockMvc.perform(get("/api/orgaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orgao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())));
    }
    
    @Test
    @Transactional
    public void getOrgao() throws Exception {
        // Initialize the database
        orgaoRepository.saveAndFlush(orgao);

        // Get the orgao
        restOrgaoMockMvc.perform(get("/api/orgaos/{id}", orgao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orgao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrgao() throws Exception {
        // Get the orgao
        restOrgaoMockMvc.perform(get("/api/orgaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrgao() throws Exception {
        // Initialize the database
        orgaoRepository.saveAndFlush(orgao);

        int databaseSizeBeforeUpdate = orgaoRepository.findAll().size();

        // Update the orgao
        Orgao updatedOrgao = orgaoRepository.findById(orgao.getId()).get();
        // Disconnect from session so that the updates on updatedOrgao are not directly saved in db
        em.detach(updatedOrgao);
        updatedOrgao
            .nome(UPDATED_NOME)
            .endereco(UPDATED_ENDERECO)
            .telefone(UPDATED_TELEFONE);

        restOrgaoMockMvc.perform(put("/api/orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrgao)))
            .andExpect(status().isOk());

        // Validate the Orgao in the database
        List<Orgao> orgaoList = orgaoRepository.findAll();
        assertThat(orgaoList).hasSize(databaseSizeBeforeUpdate);
        Orgao testOrgao = orgaoList.get(orgaoList.size() - 1);
        assertThat(testOrgao.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testOrgao.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testOrgao.getTelefone()).isEqualTo(UPDATED_TELEFONE);
    }

    @Test
    @Transactional
    public void updateNonExistingOrgao() throws Exception {
        int databaseSizeBeforeUpdate = orgaoRepository.findAll().size();

        // Create the Orgao

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrgaoMockMvc.perform(put("/api/orgaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orgao)))
            .andExpect(status().isBadRequest());

        // Validate the Orgao in the database
        List<Orgao> orgaoList = orgaoRepository.findAll();
        assertThat(orgaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrgao() throws Exception {
        // Initialize the database
        orgaoRepository.saveAndFlush(orgao);

        int databaseSizeBeforeDelete = orgaoRepository.findAll().size();

        // Get the orgao
        restOrgaoMockMvc.perform(delete("/api/orgaos/{id}", orgao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Orgao> orgaoList = orgaoRepository.findAll();
        assertThat(orgaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Orgao.class);
        Orgao orgao1 = new Orgao();
        orgao1.setId(1L);
        Orgao orgao2 = new Orgao();
        orgao2.setId(orgao1.getId());
        assertThat(orgao1).isEqualTo(orgao2);
        orgao2.setId(2L);
        assertThat(orgao1).isNotEqualTo(orgao2);
        orgao1.setId(null);
        assertThat(orgao1).isNotEqualTo(orgao2);
    }
}
