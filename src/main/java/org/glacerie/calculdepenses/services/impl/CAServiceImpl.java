package org.glacerie.calculdepenses.services.impl;

import org.glacerie.calculdepenses.dao.ChiffreAffaire;
import org.glacerie.calculdepenses.repository.CARepository;
import org.glacerie.calculdepenses.services.CAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CAServiceImpl implements CAService {

    @Autowired
    private CARepository CARepository;
    @Override
    public ChiffreAffaire createRevenu(ChiffreAffaire chiffreAffaire) {

        return CARepository.save(chiffreAffaire);
    }

    @Override
    public List<ChiffreAffaire> listRevenu() {
        return CARepository.findAll();
    }



    @Override
    public void deleteRevenu(Long revenuId) {
            Optional<ChiffreAffaire> revenu = CARepository.findById(revenuId);
            CARepository.delete(revenu.get());
    }

    @Override
    public List<ChiffreAffaire>  listCAInterval(String date1, String date2) throws ParseException {

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date1_ = formatter.parse(date1);
        Date date2_ = formatter.parse(date2);
        return CARepository.getCAbyRange(date1_,date2_);
    }
}
