import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/dbConnect';
import TournamentRegistration from '../../../../models/TournamentRegistration';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { id } = req.query;
  const { paymentToken, paymentMethod, teamMembers, tournamentAmount } = req.body;
  const userId = session.user.id;

  if (!paymentToken || !paymentMethod) {
    return res.status(400).json({ success: false, message: 'Payment details required' });
  }

  if (!teamMembers || teamMembers.length === 0) {
    return res.status(400).json({ success: false, message: 'Team members required' });
  }

  if (!tournamentAmount || tournamentAmount <=0){
    return res.status(400).json({ success: false, message: 'Tournament amount required' });
  }

  try {
    await dbConnect();

    let registration = await TournamentRegistration.findById(id);
    if (!registration) {
      // Create new registration if it doesn't exist.  This assumes the 'id' refers to a team ID or a newly created tournament.
      registration = new TournamentRegistration({
        _id: id, // Assuming 'id' is pre-generated
        teamMembers: teamMembers.map(member => ({ userId: member, paymentStatus: 'pending', tournamentAmount: tournamentAmount })),
        tournamentAmount: tournamentAmount
      });
    }

    //Update existing registration
    const updatedMemberPayments = registration.teamMembers.map(member => {
      if (member.userId.toString() === userId) {
        return { ...member, paymentStatus: 'completed', paymentToken, paymentMethod, paidAt: new Date() };
      }
      return member;
    });

    registration.teamMembers = updatedMemberPayments;
    await registration.save();
    res.status(200).json({ success: true, data: registration });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ success: false, message: 'Error updating payment status' });
  }
}