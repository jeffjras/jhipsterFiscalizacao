package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Condutor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Condutor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CondutorRepository extends JpaRepository<Condutor, Long> {

}
