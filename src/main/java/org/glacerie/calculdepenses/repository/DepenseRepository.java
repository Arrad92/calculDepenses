package org.glacerie.calculdepenses.repository;

import org.glacerie.calculdepenses.dao.Depense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepenseRepository extends JpaRepository<Depense, Long> {
}
