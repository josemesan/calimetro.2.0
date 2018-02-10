package com.metro.calimetro.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.metro.calimetro.domain.enumeration.TipoDia;

/**
 * A IntervaloOfertado.
 */
@Entity
@Table(name = "intervalo_ofertado")
public class IntervaloOfertado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_hora")
    private ZonedDateTime fechaHora;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_dia")
    private TipoDia tipoDia;

    @Column(name = "intervalo_max")
    private Integer intervaloMax;

    @Column(name = "intervalo_min")
    private Integer intervaloMin;

    @ManyToOne
    private Linea linea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaHora() {
        return fechaHora;
    }

    public IntervaloOfertado fechaHora(ZonedDateTime fechaHora) {
        this.fechaHora = fechaHora;
        return this;
    }

    public void setFechaHora(ZonedDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public TipoDia getTipoDia() {
        return tipoDia;
    }

    public IntervaloOfertado tipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
        return this;
    }

    public void setTipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
    }

    public Integer getIntervaloMax() {
        return intervaloMax;
    }

    public IntervaloOfertado intervaloMax(Integer intervaloMax) {
        this.intervaloMax = intervaloMax;
        return this;
    }

    public void setIntervaloMax(Integer intervaloMax) {
        this.intervaloMax = intervaloMax;
    }

    public Integer getIntervaloMin() {
        return intervaloMin;
    }

    public IntervaloOfertado intervaloMin(Integer intervaloMin) {
        this.intervaloMin = intervaloMin;
        return this;
    }

    public void setIntervaloMin(Integer intervaloMin) {
        this.intervaloMin = intervaloMin;
    }

    public Linea getLinea() {
        return linea;
    }

    public IntervaloOfertado linea(Linea linea) {
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
        IntervaloOfertado intervaloOfertado = (IntervaloOfertado) o;
        if (intervaloOfertado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), intervaloOfertado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IntervaloOfertado{" +
            "id=" + getId() +
            ", fechaHora='" + getFechaHora() + "'" +
            ", tipoDia='" + getTipoDia() + "'" +
            ", intervaloMax=" + getIntervaloMax() +
            ", intervaloMin=" + getIntervaloMin() +
            "}";
    }
}
