package com.usmb.but3.td4biblio.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRole;

    @Column(length = 30)
    private String libelleRole;

    public boolean isEqualTo(Role r) {
        if (this == r) return true;
        if (r == null) return false;
        if (idRole != null ? !idRole.equals(r.idRole) : r.idRole != null) return false;
        return libelleRole != null ? libelleRole.equals(r.libelleRole) : r.libelleRole == null;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return isEqualTo((Role) obj);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (idRole != null ? idRole.hashCode() : 0);
        result = 31 * result + (libelleRole != null ? libelleRole.hashCode() : 0);
        return result;
    }
}