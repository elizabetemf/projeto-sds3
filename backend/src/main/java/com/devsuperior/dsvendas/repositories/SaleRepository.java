package com.devsuperior.dsvendas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.dsvendas.dto.SaleSucessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

	@Query("select new com.devsuperior.dsvendas.dto.SaleSumDTO(obj.seller, sum(obj.amount))"
			+ " from Sale obj group by obj.seller")
	List<SaleSumDTO> amountGroupedBySeller();

	@Query("select new com.devsuperior.dsvendas.dto.SaleSucessDTO(obj.seller, sum(obj.visited), sum(obj.deals))"
			+ " from Sale obj group by obj.seller")
	List<SaleSucessDTO> sucessGroupedBySeller();

}
