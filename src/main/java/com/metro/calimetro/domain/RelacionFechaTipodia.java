package com.metro.calimetro.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.metro.calimetro.domain.enumeration.TipoDia;

/**
 * A RelacionFechaTipodia.
 */
@Entity
@Table(name = "relacion_fecha_tipodia")
public class RelacionFechaTipodia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_dia")
    private TipoDia tipoDia;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFecha() {
        return fecha;
    }

    public RelacionFechaTipodia fecha(ZonedDateTime fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public TipoDia getTipoDia() {
        return tipoDia;
    }

    public RelacionFechaTipodia tipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
        return this;
    }

    public void setTipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
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
        RelacionFechaTipodia relacionFechaTipodia = (RelacionFechaTipodia) o;
        if (relacionFechaTipodia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), relacionFechaTipodia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RelacionFechaTipodia{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", tipoDia='" + getTipoDia() + "'" +
            "}";
    }
}
