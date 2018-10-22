package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Departamento.
 */
@Entity
@Table(name = "departamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Departamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "departamento")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Funcionario> agentes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("departamentos")
    private Operacao operacao;

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

    public Departamento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Funcionario> getAgentes() {
        return agentes;
    }

    public Departamento agentes(Set<Funcionario> funcionarios) {
        this.agentes = funcionarios;
        return this;
    }

    public Departamento addAgentes(Funcionario funcionario) {
        this.agentes.add(funcionario);
        funcionario.setDepartamento(this);
        return this;
    }

    public Departamento removeAgentes(Funcionario funcionario) {
        this.agentes.remove(funcionario);
        funcionario.setDepartamento(null);
        return this;
    }

    public void setAgentes(Set<Funcionario> funcionarios) {
        this.agentes = funcionarios;
    }

    public Operacao getOperacao() {
        return operacao;
    }

    public Departamento operacao(Operacao operacao) {
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
        Departamento departamento = (Departamento) o;
        if (departamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), departamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Departamento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
