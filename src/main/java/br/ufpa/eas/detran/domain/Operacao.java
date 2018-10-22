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

import br.ufpa.eas.detran.domain.enumeration.StatusOperacao;

/**
 * A Operacao.
 */
@Entity
@Table(name = "operacao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Operacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusOperacao status;

    @OneToMany(mappedBy = "operacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fiscalizacao> fiscalizacoes = new HashSet<>();
    @OneToMany(mappedBy = "operacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Localizacao> locais = new HashSet<>();
    @OneToMany(mappedBy = "operacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Equipamento> equipamentos = new HashSet<>();
    @OneToMany(mappedBy = "operacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Departamento> departamentos = new HashSet<>();
    @OneToMany(mappedBy = "operacao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Veiculo> veiculos = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("operacoes")
    private Orgao orgao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public Operacao data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public StatusOperacao getStatus() {
        return status;
    }

    public Operacao status(StatusOperacao status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusOperacao status) {
        this.status = status;
    }

    public Set<Fiscalizacao> getFiscalizacoes() {
        return fiscalizacoes;
    }

    public Operacao fiscalizacoes(Set<Fiscalizacao> fiscalizacaos) {
        this.fiscalizacoes = fiscalizacaos;
        return this;
    }

    public Operacao addFiscalizacoes(Fiscalizacao fiscalizacao) {
        this.fiscalizacoes.add(fiscalizacao);
        fiscalizacao.setOperacao(this);
        return this;
    }

    public Operacao removeFiscalizacoes(Fiscalizacao fiscalizacao) {
        this.fiscalizacoes.remove(fiscalizacao);
        fiscalizacao.setOperacao(null);
        return this;
    }

    public void setFiscalizacoes(Set<Fiscalizacao> fiscalizacaos) {
        this.fiscalizacoes = fiscalizacaos;
    }

    public Set<Localizacao> getLocais() {
        return locais;
    }

    public Operacao locais(Set<Localizacao> localizacaos) {
        this.locais = localizacaos;
        return this;
    }

    public Operacao addLocais(Localizacao localizacao) {
        this.locais.add(localizacao);
        localizacao.setOperacao(this);
        return this;
    }

    public Operacao removeLocais(Localizacao localizacao) {
        this.locais.remove(localizacao);
        localizacao.setOperacao(null);
        return this;
    }

    public void setLocais(Set<Localizacao> localizacaos) {
        this.locais = localizacaos;
    }

    public Set<Equipamento> getEquipamentos() {
        return equipamentos;
    }

    public Operacao equipamentos(Set<Equipamento> equipamentos) {
        this.equipamentos = equipamentos;
        return this;
    }

    public Operacao addEquipamentos(Equipamento equipamento) {
        this.equipamentos.add(equipamento);
        equipamento.setOperacao(this);
        return this;
    }

    public Operacao removeEquipamentos(Equipamento equipamento) {
        this.equipamentos.remove(equipamento);
        equipamento.setOperacao(null);
        return this;
    }

    public void setEquipamentos(Set<Equipamento> equipamentos) {
        this.equipamentos = equipamentos;
    }

    public Set<Departamento> getDepartamentos() {
        return departamentos;
    }

    public Operacao departamentos(Set<Departamento> departamentos) {
        this.departamentos = departamentos;
        return this;
    }

    public Operacao addDepartamentos(Departamento departamento) {
        this.departamentos.add(departamento);
        departamento.setOperacao(this);
        return this;
    }

    public Operacao removeDepartamentos(Departamento departamento) {
        this.departamentos.remove(departamento);
        departamento.setOperacao(null);
        return this;
    }

    public void setDepartamentos(Set<Departamento> departamentos) {
        this.departamentos = departamentos;
    }

    public Set<Veiculo> getVeiculos() {
        return veiculos;
    }

    public Operacao veiculos(Set<Veiculo> veiculos) {
        this.veiculos = veiculos;
        return this;
    }

    public Operacao addVeiculos(Veiculo veiculo) {
        this.veiculos.add(veiculo);
        veiculo.setOperacao(this);
        return this;
    }

    public Operacao removeVeiculos(Veiculo veiculo) {
        this.veiculos.remove(veiculo);
        veiculo.setOperacao(null);
        return this;
    }

    public void setVeiculos(Set<Veiculo> veiculos) {
        this.veiculos = veiculos;
    }

    public Orgao getOrgao() {
        return orgao;
    }

    public Operacao orgao(Orgao orgao) {
        this.orgao = orgao;
        return this;
    }

    public void setOrgao(Orgao orgao) {
        this.orgao = orgao;
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
        Operacao operacao = (Operacao) o;
        if (operacao.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operacao.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Operacao{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
