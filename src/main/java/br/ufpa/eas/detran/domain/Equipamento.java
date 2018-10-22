package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import br.ufpa.eas.detran.domain.enumeration.TipoEquipamento;

/**
 * A Equipamento.
 */
@Entity
@Table(name = "equipamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Equipamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoEquipamento tipo;

    @Column(name = "data_entrada")
    private LocalDate dataEntrada;

    @ManyToOne
    @JsonIgnoreProperties("equipamentos")
    private Operacao operacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Equipamento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoEquipamento getTipo() {
        return tipo;
    }

    public Equipamento tipo(TipoEquipamento tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoEquipamento tipo) {
        this.tipo = tipo;
    }

    public LocalDate getDataEntrada() {
        return dataEntrada;
    }

    public Equipamento dataEntrada(LocalDate dataEntrada) {
        this.dataEntrada = dataEntrada;
        return this;
    }

    public void setDataEntrada(LocalDate dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public Operacao getOperacao() {
        return operacao;
    }

    public Equipamento operacao(Operacao operacao) {
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
        Equipamento equipamento = (Equipamento) o;
        if (equipamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), equipamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Equipamento{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", dataEntrada='" + getDataEntrada() + "'" +
            "}";
    }
}
