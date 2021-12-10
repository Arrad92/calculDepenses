package org.glacerie.calculdepenses.repository;

import org.glacerie.calculdepenses.dao.ChiffreAffaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CARepository extends JpaRepository<ChiffreAffaire, Long> {
}
