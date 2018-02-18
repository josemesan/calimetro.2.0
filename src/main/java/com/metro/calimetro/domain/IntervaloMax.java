package com.metro.calimetro.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.metro.calimetro.domain.enumeration.TipoVia;

/**
 * A IntervaloMax.
 */
@Entity
@Table(name = "intervalo_max")
public class IntervaloMax implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hora")
    private ZonedDateTime hora;

    @Column(name = "inter_max")
    private Integer interMax;

    @Size(max = 5)
    @Column(name = "estacion_max", length = 5)
    private String estacionMax;

    @Enumerated(EnumType.STRING)
    @Column(name = "viamax")
    private TipoVia viamax;

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

    public IntervaloMax hora(ZonedDateTime hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(ZonedDateTime hora) {
        this.hora = hora;
    }

    public Integer getInterMax() {
        return interMax;
    }

    public IntervaloMax interMax(Integer interMax) {
        this.interMax = interMax;
        return this;
    }

    public void setInterMax(Integer interMax) {
        this.interMax = interMax;
    }

    public String getEstacionMax() {
        return estacionMax;
    }

    public IntervaloMax estacionMax(String estacionMax) {
        this.estacionMax = estacionMax;
        return this;
    }

    public void setEstacionMax(String estacionMax) {
        this.estacionMax = estacionMax;
    }

    public TipoVia getViamax() {
        return viamax;
    }

    public IntervaloMax viamax(TipoVia viamax) {
        this.viamax = viamax;
        return this;
    }

    public void setViamax(TipoVia viamax) {
        this.viamax = viamax;
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
        IntervaloMax intervaloMax = (IntervaloMax) o;
        if (intervaloMax.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), intervaloMax.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IntervaloMax{" +
            "id=" + getId() +
            ", hora='" + getHora() + "'" +
            ", interMax=" + getInterMax() +
            ", estacionMax='" + getEstacionMax() + "'" +
            ", viamax='" + getViamax() + "'" +
            "}";
    }
}
