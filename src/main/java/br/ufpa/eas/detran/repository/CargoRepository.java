package br.ufpa.eas.detran.repository;

import br.ufpa.eas.detran.domain.Cargo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cargo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {

}
