package br.ufpa.eas.detran.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import br.ufpa.eas.detran.domain.enumeration.TipoVeiculo;

/**
 * A Veiculo.
 */
@Entity
@Table(name = "veiculo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Veiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "marca")
    private String marca;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "placa")
    private String placa;

    @Column(name = "chassi")
    private String chassi;

    @Column(name = "ano")
    private Integer ano;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoVeiculo tipo;

    @ManyToOne
    @JsonIgnoreProperties("veiculos")
    private Fiscalizacao fiscalizacao;

    @ManyToOne
    @JsonIgnoreProperties("veiculos")
    private Operacao operacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public Veiculo marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public Veiculo modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getPlaca() {
        return placa;
    }

    public Veiculo placa(String placa) {
        this.placa = placa;
        return this;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getChassi() {
        return chassi;
    }

    public Veiculo chassi(String chassi) {
        this.chassi = chassi;
        return this;
    }

    public void setChassi(String chassi) {
        this.chassi = chassi;
    }

    public Integer getAno() {
        return ano;
    }

    public Veiculo ano(Integer ano) {
        this.ano = ano;
        return this;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public TipoVeiculo getTipo() {
        return tipo;
    }

    public Veiculo tipo(TipoVeiculo tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoVeiculo tipo) {
        this.tipo = tipo;
    }

    public Fiscalizacao getFiscalizacao() {
        return fiscalizacao;
    }

    public Veiculo fiscalizacao(Fiscalizacao fiscalizacao) {
        this.fiscalizacao = fiscalizacao;
        return this;
    }

    public void setFiscalizacao(Fiscalizacao fiscalizacao) {
        this.fiscalizacao = fiscalizacao;
    }

    public Operacao getOperacao() {
        return operacao;
    }

    public Veiculo operacao(Operacao operacao) {
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
        Veiculo veiculo = (Veiculo) o;
        if (veiculo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), veiculo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Veiculo{" +
            "id=" + getId() +
            ", marca='" + getMarca() + "'" +
            ", modelo='" + getModelo() + "'" +
            ", placa='" + getPlaca() + "'" +
            ", chassi='" + getChassi() + "'" +
            ", ano=" + getAno() +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
