package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Localizacao.
 */
@Entity
@Table(name = "localizacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Localizacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "logradouro")
    private String logradouro;

    @Column(name = "perimetro")
    private String perimetro;

    @ManyToOne
    @JsonIgnoreProperties("locais")
    private Operacao operacao;

    @ManyToOne
    @JsonIgnoreProperties("locais")
    private Fiscalizacao fiscalizacao;

    @ManyToOne
    @JsonIgnoreProperties("locais")
    private Municipio municipio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBairro() {
        return bairro;
    }

    public Localizacao bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public Localizacao logradouro(String logradouro) {
        this.logradouro = logradouro;
        return this;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getPerimetro() {
        return perimetro;
    }

    public Localizacao perimetro(String perimetro) {
        this.perimetro = perimetro;
        return this;
    }

    public void setPerimetro(String perimetro) {
        this.perimetro = perimetro;
    }

    public Operacao getOperacao() {
        return operacao;
    }

    public Localizacao operacao(Operacao operacao) {
        this.operacao = operacao;
        return this;
    }

    public void setOperacao(Operacao operacao) {
        this.operacao = operacao;
    }

    public Fiscalizacao getFiscalizacao() {
        return fiscalizacao;
    }

    public Localizacao fiscalizacao(Fiscalizacao fiscalizacao) {
        this.fiscalizacao = fiscalizacao;
        return this;
    }

    public void setFiscalizacao(Fiscalizacao fiscalizacao) {
        this.fiscalizacao = fiscalizacao;
    }

    public Municipio getMunicipio() {
        return municipio;
    }

    public Localizacao municipio(Municipio municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(Municipio municipio) {
        this.municipio = municipio;
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
        Localizacao localizacao = (Localizacao) o;
        if (localizacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), localizacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Localizacao{" +
            "id=" + getId() +
            ", bairro='" + getBairro() + "'" +
            ", logradouro='" + getLogradouro() + "'" +
            ", perimetro='" + getPerimetro() + "'" +
            "}";
    }
}
