package org.glacerie.calculdepenses.repository;

import org.glacerie.calculdepenses.dao.ChiffreAffaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface CARepository extends JpaRepository<ChiffreAffaire, Long> {

    @Query(nativeQuery = true,value="Select * from CHIFFRE_AFFAIRES where DATE_CA >=:date1 AND DATE_CA <=:date2")
    public List<ChiffreAffaire> getCAbyRange(Date date1,Date date2);
}
