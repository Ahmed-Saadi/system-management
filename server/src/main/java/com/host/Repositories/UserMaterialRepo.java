package com.host.Repositories;

import com.host.model.Material;
import com.host.model.User;
import com.host.model.UserMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserMaterialRepo extends JpaRepository<UserMaterial,Integer> {
    @Query(value = "select * from user_material u  where u.material_id = :id",nativeQuery = true)
    Optional<UserMaterial> findByMaterialId(int id);

    @Query(value = "select u_id from users u join user_material m on u.u_id = m.user_id where material_id= ? and last_date is null ",nativeQuery = true)
    int findUser(int id );
    @Query(value = "select * from user_material where material_id = ?1 and user_id=?2",nativeQuery = true)
    Optional<UserMaterial> findByMaterial_IdAndUser_Id(int material, int user);
    @Query(value = "select * from user_material where material_id= ?1 and last_date is null " , nativeQuery = true)
    Optional<UserMaterial> findUserMaterialHavingAnOldOwner(int id);
}
