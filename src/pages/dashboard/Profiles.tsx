import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useMockUsers } from "../../hooks/useMockUsers";
import AddDependentsModal from "../../components/molecules/AddDependentsModal";
import MockUserCard from "../../components/molecules/MockUserCard";
import { MockUser, User } from "../../domain/user";
import { useUserDependents } from "../../hooks/useUserDependents";
import UserDependentCard from "../../components/molecules/UserDependentCard";

const Profiles: React.FC = () => {
  const navigate = useNavigate();
  const {
    mockUsers,
    loader,
    isLoading,
    isLastItem,
    showModal,
    isModalOpen,
    hideModal,
  } = useMockUsers();
  const {
    dependents,
    loader: dependentLoader,
    isLoading: dependentIsLoading,
    isLastItem: isDependentLastItem,
  } = useUserDependents();

  return (
    <div>
      <div className="flex items-center space-x-[6rem]">
        <LeftOutlined onClick={() => navigate(-1)} />
        <h3 className="py-[2rem] font-bold text-[20px]">My Profiles</h3>
      </div>

      <div className="w-full px-4">
        <Button variant="contained" color="secondary" onClick={showModal}>
          Add Profile
        </Button>
        <div className="space-y-3 max-h-[680px] overflow-y-auto mt-5">
          {dependents?.map((user: User, _index: number) => (
            <UserDependentCard
              key={_index}
              name={user.name}
              userPhoto={user.photo}
              email={user.email}
              userDependentId={user.id}
            />
          ))}
          {dependentIsLoading ? (
            <h3 className="text-center">Fetching mock users...</h3>
          ) : !dependents || dependents.length === 0 ? (
            <h3 className="text-center">No profiles found.</h3>
          ) : null}

          {!isDependentLastItem && (
            <div ref={dependentLoader} className="h-10 w-full" />
          )}
        </div>
        <AddDependentsModal
          isOpen={isModalOpen}
          title="Add Dependents"
          handleCancel={hideModal}
        >
          <div className="max-h-[700px] overflow-y-auto space-y-[1rem] mt-2">
            {mockUsers?.map((user: MockUser, _index: number) => (
              <MockUserCard
                key={_index}
                name={user.name}
                userPhoto={user.photo}
                email={user.email}
                userDependentId={user.id}
                isAddedUserProfile={user.isUserDependentAdded}
              />
            ))}
            {isLoading ? (
              <h3 className="text-center">Fetching mock users...</h3>
            ) : !mockUsers || mockUsers.length === 0 ? (
              <h3 className="text-center">No users found.</h3>
            ) : null}
            {!isLastItem && <div ref={loader} className="h-10 w-full" />}
          </div>
        </AddDependentsModal>
      </div>
    </div>
  );
};

export default Profiles;
