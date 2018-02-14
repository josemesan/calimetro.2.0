package com.metro.calimetro.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.metro.calimetro.domain.enumeration.TipoDia;

/**
 * A TablaTrenes.
 */
@Entity
@Table(name = "tabla_trenes")
public class TablaTrenes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hora")
    private ZonedDateTime hora;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_dia")
    private TipoDia tipoDia;

    @Column(name = "numero_trenes")
    private Integer numeroTrenes;

    @ManyToOne
    private Linea linea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getHora() {
        return hora;
    }

    public TablaTrenes hora(ZonedDateTime hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(ZonedDateTime hora) {
        this.hora = hora;
    }

    public TipoDia getTipoDia() {
        return tipoDia;
    }

    public TablaTrenes tipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
        return this;
    }

    public void setTipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
    }

    public Integer getNumeroTrenes() {
        return numeroTrenes;
    }

    public TablaTrenes numeroTrenes(Integer numeroTrenes) {
        this.numeroTrenes = numeroTrenes;
        return this;
    }

    public void setNumeroTrenes(Integer numeroTrenes) {
        this.numeroTrenes = numeroTrenes;
    }

    public Linea getLinea() {
        return linea;
    }

    public TablaTrenes linea(Linea linea) {
        this.linea = linea;
        return this;
    }

    public void setLinea(Linea linea) {
        this.linea = linea;
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
        TablaTrenes tablaTrenes = (TablaTrenes) o;
        if (tablaTrenes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tablaTrenes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TablaTrenes{" +
            "id=" + getId() +
            ", hora='" + getHora() + "'" +
            ", tipoDia='" + getTipoDia() + "'" +
            ", numeroTrenes=" + getNumeroTrenes() +
            "}";
    }
}
