// Define the PATCH method to update an existing deposit history
export async function PATCH(request) {
  const { email, amount, selectedDate, id } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.error("User not found", { status: 404 });
    }

    // Find the deposit to be updated by its depositId
    const depositIndex = user.depositHistory.findIndex(
      (deposit) => deposit._id.toString() === id
    );

    if (depositIndex === -1) {
      return NextResponse.error("Deposit not found", { status: 404 });
    }

    // Get the old deposit amount to adjust the balance correctly
    const oldAmount = user.depositHistory[depositIndex].amount;

    // Calculate the difference in deposit amount (newAmount - oldAmount)
    const amountDifference = amount - oldAmount;

    // Update the deposit fields
    const updatedDeposit = {
      ...user.depositHistory[depositIndex],
      ...(amount && { amount }),
      ...(selectedDate && { dateAdded: selectedDate }),
      transactionStatus: "Approved",
      depositMethod: "Deposited",
    };

    // Update the deposit in the depositHistory array
    user.depositHistory[depositIndex] = updatedDeposit;

    // Update the totalDeposited and balance
    user.totalDeposited += amountDifference;
    user.balance += amountDifference; // Adjust the balance by the difference

    // Save the updated user document
    await user.save();

    return NextResponse.json({
      message: "Deposit history updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating deposit history: ", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
