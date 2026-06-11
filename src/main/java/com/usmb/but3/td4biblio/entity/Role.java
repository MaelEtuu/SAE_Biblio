package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer idRole;

    @Column(length = 30)
    private String libelleRole;

    public boolean isEqualTo(Role r) {
        if (this == r) return true;
        if (r == null) return false;
        if (idRole != null ? !idRole.equals(r.idRole) : r.idRole != null) return false;
        return libelleRole != null ? libelleRole.equals(r.libelleRole) : r.libelleRole == null;
    }
}