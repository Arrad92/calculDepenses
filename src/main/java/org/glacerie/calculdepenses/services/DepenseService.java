package org.glacerie.calculdepenses.services;

import org.glacerie.calculdepenses.dao.Depense;

import java.util.List;

public interface DepenseService {

     Depense createDepense(Depense depense);
     List<Depense> listDepense();
     void deleteDepense(Long id);

}
