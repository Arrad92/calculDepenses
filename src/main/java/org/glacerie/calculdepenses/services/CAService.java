package org.glacerie.calculdepenses.services;

import org.glacerie.calculdepenses.dao.ChiffreAffaire;

import java.util.List;

public interface CAService {
    public ChiffreAffaire createRevenu(ChiffreAffaire chiffreAffaire);
    public List<ChiffreAffaire> listRevenu();
    public void deleteRevenu(Long revenu);
}
