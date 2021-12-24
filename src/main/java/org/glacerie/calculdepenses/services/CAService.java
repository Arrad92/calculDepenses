package org.glacerie.calculdepenses.services;

import org.glacerie.calculdepenses.dao.ChiffreAffaire;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface CAService {
    public ChiffreAffaire createRevenu(ChiffreAffaire chiffreAffaire);
    public List<ChiffreAffaire> listRevenu();
    public void deleteRevenu(Long revenu);
    public List<ChiffreAffaire>  listCAInterval(String date1, String date2) throws ParseException;
}
