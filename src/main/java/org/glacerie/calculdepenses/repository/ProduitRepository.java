package org.glacerie.calculdepenses.repository;

import org.glacerie.calculdepenses.dao.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
}
