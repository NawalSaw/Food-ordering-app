import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import NotFound from "@/components/NotFound";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { Loader2 } from "lucide-react";

const UserProfilePage = () => {
  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateUserLoading } = useUpdateMyUser();

  if (isCurrentUserLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-9 w-9 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <NotFound
        statusCode={404}
        message="User not found"
        description="Sorry, we can't find the user. You'll find lots to explore on the home page."
      />
    );
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateUserLoading}
    />
  );
};

export default UserProfilePage;
