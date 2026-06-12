package com.usmb.but3.td4biblio.service;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service générique de base : centralise les opérations CRUD communes
 * (findAll, findById, save, deleteById, count) déléguées au repository Spring Data.
 *
 * <p>Chaque service concret hérite de cette classe en précisant son type d'entité
 * {@code T} et son type d'identifiant {@code ID}, puis fournit son repository via
 * {@link #getRepository()}. Les requêtes et règles métier spécifiques restent
 * définies dans le service concret.</p>
 *
 * @param <T>  type de l'entité gérée
 * @param <ID> type de la clé primaire (Integer, ou clé composite type EmpruntsId)
 */
public abstract class AbstractCrudService<T, ID> {

    /** Repository utilisé pour les opérations CRUD (fourni par le service concret). */
    protected abstract JpaRepository<T, ID> getRepository();

    /** Retourne toutes les entités. */
    public List<T> getAll() {
        return getRepository().findAll();
    }

    /** Entité par identifiant, ou {@link Optional#empty()} si absente. */
    public Optional<T> findById(ID id) {
        return getRepository().findById(id);
    }

    /**
     * Entité par identifiant.
     *
     * @throws IllegalArgumentException si aucune entité ne correspond.
     */
    public T getById(ID id) {
        return getRepository().findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Entité introuvable : " + id));
    }

    /** Crée ou met à jour une entité. */
    public T save(T entity) {
        return getRepository().save(entity);
    }

    /** Supprime une entité par son identifiant. */
    public void deleteById(ID id) {
        getRepository().deleteById(id);
    }

    /** Nombre total d'entités. */
    public long count() {
        return getRepository().count();
    }
}