package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Municipio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Municipio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MunicipioRepository extends JpaRepository<Municipio, Long> {

}
