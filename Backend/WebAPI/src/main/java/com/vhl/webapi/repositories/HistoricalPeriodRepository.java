package com.vhl.webapi.repositories;

import com.vhl.webapi.entities.specific.HistoricalPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricalPeriodRepository extends JpaRepository<HistoricalPeriod, String> {

}