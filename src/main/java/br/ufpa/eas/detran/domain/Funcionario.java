package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Funcionario.
 */
@Entity
@Table(name = "funcionario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Funcionario implements Serializable {

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

    @Column(name = "num_veiculo_abordado")
    private Integer numVeiculoAbordado;

    @Column(name = "num_doc_apreendido")
    private Integer numDocApreendido;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Funcionario supervisor;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Funcionario chefe;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Funcionario gerente;

    @ManyToOne
    @JsonIgnoreProperties("agentes")
    private Departamento departamento;

    @ManyToOne
    @JsonIgnoreProperties("funcionarios")
    private Cargo cargo;

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

    public Funcionario nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public Funcionario endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public Funcionario telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Integer getNumVeiculoAbordado() {
        return numVeiculoAbordado;
    }

    public Funcionario numVeiculoAbordado(Integer numVeiculoAbordado) {
        this.numVeiculoAbordado = numVeiculoAbordado;
        return this;
    }

    public void setNumVeiculoAbordado(Integer numVeiculoAbordado) {
        this.numVeiculoAbordado = numVeiculoAbordado;
    }

    public Integer getNumDocApreendido() {
        return numDocApreendido;
    }

    public Funcionario numDocApreendido(Integer numDocApreendido) {
        this.numDocApreendido = numDocApreendido;
        return this;
    }

    public void setNumDocApreendido(Integer numDocApreendido) {
        this.numDocApreendido = numDocApreendido;
    }

    public Funcionario getSupervisor() {
        return supervisor;
    }

    public Funcionario supervisor(Funcionario funcionario) {
        this.supervisor = funcionario;
        return this;
    }

    public void setSupervisor(Funcionario funcionario) {
        this.supervisor = funcionario;
    }

    public Funcionario getChefe() {
        return chefe;
    }

    public Funcionario chefe(Funcionario funcionario) {
        this.chefe = funcionario;
        return this;
    }

    public void setChefe(Funcionario funcionario) {
        this.chefe = funcionario;
    }

    public Funcionario getGerente() {
        return gerente;
    }

    public Funcionario gerente(Funcionario funcionario) {
        this.gerente = funcionario;
        return this;
    }

    public void setGerente(Funcionario funcionario) {
        this.gerente = funcionario;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public Funcionario departamento(Departamento departamento) {
        this.departamento = departamento;
        return this;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public Funcionario cargo(Cargo cargo) {
        this.cargo = cargo;
        return this;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
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
        Funcionario funcionario = (Funcionario) o;
        if (funcionario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), funcionario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Funcionario{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", endereco='" + getEndereco() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", numVeiculoAbordado=" + getNumVeiculoAbordado() +
            ", numDocApreendido=" + getNumDocApreendido() +
            "}";
    }
}
