package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Condutor.
 */
@Entity
@Table(name = "condutor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Condutor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "telefone")
    private String telefone;

    @ManyToOne
    @JsonIgnoreProperties("condutores")
    private Fiscalizacao fiscalizacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Condutor nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public Condutor endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public Condutor telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Fiscalizacao getFiscalizacao() {
        return fiscalizacao;
    }

    public Condutor fiscalizacao(Fiscalizacao fiscalizacao) {
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
        Condutor condutor = (Condutor) o;
        if (condutor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), condutor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Condutor{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", endereco='" + getEndereco() + "'" +
            ", telefone='" + getTelefone() + "'" +
            "}";
    }
}
