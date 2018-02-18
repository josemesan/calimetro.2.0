package com.metro.calimetro.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.metro.calimetro.domain.enumeration.TipoVia;

/**
 * A IntervaloMin.
 */
@Entity
@Table(name = "intervalo_min")
public class IntervaloMin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hora")
    private ZonedDateTime hora;

    @Column(name = "inter_min")
    private Integer interMin;

    @Size(max = 5)
    @Column(name = "estacion_min", length = 5)
    private String estacionMin;

    @Enumerated(EnumType.STRING)
    @Column(name = "via_min")
    private TipoVia viaMin;

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

    public IntervaloMin hora(ZonedDateTime hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(ZonedDateTime hora) {
        this.hora = hora;
    }

    public Integer getInterMin() {
        return interMin;
    }

    public IntervaloMin interMin(Integer interMin) {
        this.interMin = interMin;
        return this;
    }

    public void setInterMin(Integer interMin) {
        this.interMin = interMin;
    }

    public String getEstacionMin() {
        return estacionMin;
    }

    public IntervaloMin estacionMin(String estacionMin) {
        this.estacionMin = estacionMin;
        return this;
    }

    public void setEstacionMin(String estacionMin) {
        this.estacionMin = estacionMin;
    }

    public TipoVia getViaMin() {
        return viaMin;
    }

    public IntervaloMin viaMin(TipoVia viaMin) {
        this.viaMin = viaMin;
        return this;
    }

    public void setViaMin(TipoVia viaMin) {
        this.viaMin = viaMin;
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
        IntervaloMin intervaloMin = (IntervaloMin) o;
        if (intervaloMin.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), intervaloMin.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IntervaloMin{" +
            "id=" + getId() +
            ", hora='" + getHora() + "'" +
            ", interMin=" + getInterMin() +
            ", estacionMin='" + getEstacionMin() + "'" +
            ", viaMin='" + getViaMin() + "'" +
            "}";
    }
}
