package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cargo.
 */
@Entity
@Table(name = "cargo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cargo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "cargo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Funcionario> funcionarios = new HashSet<>();
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

    public Cargo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public Cargo funcionarios(Set<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
        return this;
    }

    public Cargo addFuncionarios(Funcionario funcionario) {
        this.funcionarios.add(funcionario);
        funcionario.setCargo(this);
        return this;
    }

    public Cargo removeFuncionarios(Funcionario funcionario) {
        this.funcionarios.remove(funcionario);
        funcionario.setCargo(null);
        return this;
    }

    public void setFuncionarios(Set<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
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
        Cargo cargo = (Cargo) o;
        if (cargo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cargo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cargo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
