package com.metro.calimetro.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_dia")
    private TipoDia tipoDia;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getFecha() {
        return fecha;
    }

    public RelacionFechaTipodia fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
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
            ", tipoDia='" + getTipoDia() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
