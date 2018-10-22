package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import br.ufpa.eas.detran.domain.enumeration.TipoDocumentacao;

/**
 * A Documentacao.
 */
@Entity
@Table(name = "documentacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Documentacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoDocumentacao tipo;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JsonIgnoreProperties("documentacoes")
    private Fiscalizacao fiscalizacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoDocumentacao getTipo() {
        return tipo;
    }

    public Documentacao tipo(TipoDocumentacao tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoDocumentacao tipo) {
        this.tipo = tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public Documentacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Fiscalizacao getFiscalizacao() {
        return fiscalizacao;
    }

    public Documentacao fiscalizacao(Fiscalizacao fiscalizacao) {
        this.fiscalizacao = fiscalizacao;
        return this;
    }

    public void setFiscalizacao(Fiscalizacao fiscalizacao) {
        this.fiscalizacao = fiscalizacao;
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
        Documentacao documentacao = (Documentacao) o;
        if (documentacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Documentacao{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
