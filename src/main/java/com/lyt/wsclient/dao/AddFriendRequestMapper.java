package com.lyt.wsclient.dao;

import com.lyt.wsclient.model.chat.AddFriendModel;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.List;

@Mapper
public interface AddFriendRequestMapper {

    @Select("SELECT afr.id, u.user_name, u.img_path, afr.invitationMsg " +
            "FROM user u, add_friendrequest afr " +
            "WHERE afr.recept_user_id = #{currentUserId} " +
            "AND u.id = afr.send_user_id " +
            "AND afr.if_recept = '0' " +
            "ORDER BY u.user_name")
    @Results({
            @Result(column="id", property="addFriendRequestId", jdbcType= JdbcType.VARCHAR, id=true),
            @Result(column="user_name", property="sendUserName", jdbcType=JdbcType.VARCHAR),
            @Result(column="img_path", property="sendUserImgPath", jdbcType=JdbcType.VARCHAR),
            @Result(column="invitationMsg", property="invitationMsg", jdbcType=JdbcType.VARCHAR),
    })
    List<AddFriendModel> findAddFriendRequestByCurrentUserId(@Param("currentUserId") String currentUserId);

}
