package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.ufpa.eas.detran.domain.enumeration.SituacaoFiscalizacao;

/**
 * A Fiscalizacao.
 */
@Entity
@Table(name = "fiscalizacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fiscalizacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "data_registro")
    private LocalDate dataRegistro;

    @Column(name = "observacao")
    private String observacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private SituacaoFiscalizacao situacao;

    @OneToMany(mappedBy = "fiscalizacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Documentacao> documentacoes = new HashSet<>();
    @OneToMany(mappedBy = "fiscalizacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Localizacao> locais = new HashSet<>();
    @OneToMany(mappedBy = "fiscalizacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Condutor> condutores = new HashSet<>();
    @OneToMany(mappedBy = "fiscalizacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Veiculo> veiculos = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("fiscalizacoes")
    private Operacao operacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public Fiscalizacao dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public Fiscalizacao dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public LocalDate getDataRegistro() {
        return dataRegistro;
    }

    public Fiscalizacao dataRegistro(LocalDate dataRegistro) {
        this.dataRegistro = dataRegistro;
        return this;
    }

    public void setDataRegistro(LocalDate dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public String getObservacao() {
        return observacao;
    }

    public Fiscalizacao observacao(String observacao) {
        this.observacao = observacao;
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public SituacaoFiscalizacao getSituacao() {
        return situacao;
    }

    public Fiscalizacao situacao(SituacaoFiscalizacao situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(SituacaoFiscalizacao situacao) {
        this.situacao = situacao;
    }

    public Set<Documentacao> getDocumentacoes() {
        return documentacoes;
    }

    public Fiscalizacao documentacoes(Set<Documentacao> documentacaos) {
        this.documentacoes = documentacaos;
        return this;
    }

    public Fiscalizacao addDocumentacoes(Documentacao documentacao) {
        this.documentacoes.add(documentacao);
        documentacao.setFiscalizacao(this);
        return this;
    }

    public Fiscalizacao removeDocumentacoes(Documentacao documentacao) {
        this.documentacoes.remove(documentacao);
        documentacao.setFiscalizacao(null);
        return this;
    }

    public void setDocumentacoes(Set<Documentacao> documentacaos) {
        this.documentacoes = documentacaos;
    }

    public Set<Localizacao> getLocais() {
        return locais;
    }

    public Fiscalizacao locais(Set<Localizacao> localizacaos) {
        this.locais = localizacaos;
        return this;
    }

    public Fiscalizacao addLocais(Localizacao localizacao) {
        this.locais.add(localizacao);
        localizacao.setFiscalizacao(this);
        return this;
    }

    public Fiscalizacao removeLocais(Localizacao localizacao) {
        this.locais.remove(localizacao);
        localizacao.setFiscalizacao(null);
        return this;
    }

    public void setLocais(Set<Localizacao> localizacaos) {
        this.locais = localizacaos;
    }

    public Set<Condutor> getCondutores() {
        return condutores;
    }

    public Fiscalizacao condutores(Set<Condutor> condutors) {
        this.condutores = condutors;
        return this;
    }

    public Fiscalizacao addCondutores(Condutor condutor) {
        this.condutores.add(condutor);
        condutor.setFiscalizacao(this);
        return this;
    }

    public Fiscalizacao removeCondutores(Condutor condutor) {
        this.condutores.remove(condutor);
        condutor.setFiscalizacao(null);
        return this;
    }

    public void setCondutores(Set<Condutor> condutors) {
        this.condutores = condutors;
    }

    public Set<Veiculo> getVeiculos() {
        return veiculos;
    }

    public Fiscalizacao veiculos(Set<Veiculo> veiculos) {
        this.veiculos = veiculos;
        return this;
    }

    public Fiscalizacao addVeiculos(Veiculo veiculo) {
        this.veiculos.add(veiculo);
        veiculo.setFiscalizacao(this);
        return this;
    }

    public Fiscalizacao removeVeiculos(Veiculo veiculo) {
        this.veiculos.remove(veiculo);
        veiculo.setFiscalizacao(null);
        return this;
    }

    public void setVeiculos(Set<Veiculo> veiculos) {
        this.veiculos = veiculos;
    }

    public Operacao getOperacao() {
        return operacao;
    }

    public Fiscalizacao operacao(Operacao operacao) {
        this.operacao = operacao;
        return this;
    }

    public void setOperacao(Operacao operacao) {
        this.operacao = operacao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Fiscalizacao fiscalizacao = (Fiscalizacao) o;
        if (fiscalizacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fiscalizacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fiscalizacao{" +
            "id=" + getId() +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            ", dataRegistro='" + getDataRegistro() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", situacao='" + getSituacao() + "'" +
            "}";
    }
}
