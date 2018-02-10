package com.metro.calimetro.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.metro.calimetro.domain.enumeration.TipoVia;

/**
 * A Estacion.
 */
@Entity
@Table(name = "estacion")
public class Estacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Size(max = 5)
    @Column(name = "nemo", length = 5)
    private String nemo;

    @Enumerated(EnumType.STRING)
    @Column(name = "via")
    private TipoVia via;

    @Column(name = "visible")
    private Boolean visible;

    @ManyToOne
    private Linea linea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Estacion nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNemo() {
        return nemo;
    }

    public Estacion nemo(String nemo) {
        this.nemo = nemo;
        return this;
    }

    public void setNemo(String nemo) {
        this.nemo = nemo;
    }

    public TipoVia getVia() {
        return via;
    }

    public Estacion via(TipoVia via) {
        this.via = via;
        return this;
    }

    public void setVia(TipoVia via) {
        this.via = via;
    }

    public Boolean isVisible() {
        return visible;
    }

    public Estacion visible(Boolean visible) {
        this.visible = visible;
        return this;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Linea getLinea() {
        return linea;
    }

    public Estacion linea(Linea linea) {
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
        Estacion estacion = (Estacion) o;
        if (estacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Estacion{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", nemo='" + getNemo() + "'" +
            ", via='" + getVia() + "'" +
            ", visible='" + isVisible() + "'" +
            "}";
    }
}
