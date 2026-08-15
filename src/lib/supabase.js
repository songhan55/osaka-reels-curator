import { createClient } from '@supabase/supabase-js';
import { DEFAULT_GROUPS } from '../data/sampleData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jirlvspexbsrgegqkqev.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppcmx2c3BleGJzcmdlZ3FrcWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3OTYxNzMsImV4cCI6MjEwMjM3MjE3M30.TofLERVODNIKrW5WTN3foZ5JZVqCUpWAAYkSWPGfOe4';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Fetch all groups and auto-seed if empty
export async function fetchGroupsFromDb() {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data: groups, error: groupErr } = await supabase
      .from('group_threads')
      .select('*')
      .order('created_at', { ascending: false });

    if (groupErr) {
      console.warn('Supabase groups fetch notice:', groupErr.message);
      return null;
    }

    // If groups table is brand new and empty, seed initial groups and reels
    if (!groups || groups.length === 0) {
      await seedInitialData();
      return DEFAULT_GROUPS;
    }

    const { data: reels, error: reelsErr } = await supabase
      .from('reels')
      .select('*')
      .order('created_at', { ascending: false });

    if (reelsErr) {
      console.warn('Supabase reels fetch notice:', reelsErr.message);
      return null;
    }

    // Merge reels into groups
    return groups.map(g => ({
      id: g.id,
      slug: g.group_slug,
      name: g.name,
      destination: g.destination,
      badge: g.badge,
      membersCount: g.members_count,
      reels: (reels || []).filter(r => r.group_id === g.id).map(r => ({
        id: r.id,
        title: r.title,
        url: r.url,
        primaryCategory: r.primary_category,
        subCategory: r.sub_category,
        region: r.region,
        lat: r.lat ? parseFloat(r.lat) : null,
        lng: r.lng ? parseFloat(r.lng) : null,
        votes: r.votes || 0,
        rating: r.rating || 5,
        memo: r.memo,
        isFavorite: r.is_favorite,
        createdAt: r.created_at ? r.created_at.split('T')[0] : '2026-08-16',
        sharedBy: r.shared_by || '단톡방'
      }))
    }));
  } catch (err) {
    console.warn('Supabase fetch error, using local fallback:', err);
    return null;
  }
}

// Seed initial default groups into empty Supabase DB
async function seedInitialData() {
  if (!supabase) return;
  try {
    for (const grp of DEFAULT_GROUPS) {
      const { data: insertedGroup, error: grpErr } = await supabase
        .from('group_threads')
        .insert({
          group_slug: grp.slug,
          name: grp.name,
          destination: grp.destination,
          badge: grp.badge,
          members_count: grp.membersCount
        })
        .select()
        .single();

      if (grpErr) {
        console.error('Seed group error:', grpErr);
        continue;
      }

      if (insertedGroup && grp.reels) {
        const reelsToInsert = grp.reels.map(r => ({
          group_id: insertedGroup.id,
          url: r.url,
          title: r.title,
          memo: r.memo,
          primary_category: r.primaryCategory,
          sub_category: r.subCategory,
          region: r.region,
          lat: r.lat,
          lng: r.lng,
          votes: r.votes || 0,
          rating: r.rating || 5,
          shared_by: r.sharedBy || '단톡방',
          is_favorite: r.isFavorite || false
        }));

        await supabase.from('reels').insert(reelsToInsert);
      }
    }
  } catch (e) {
    console.error('Auto seed exception:', e);
  }
}

// Add a reel to a group
export async function addReelToDb(groupId, reel) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('reels').insert({
      group_id: groupId,
      url: reel.url,
      title: reel.title,
      memo: reel.memo,
      primary_category: reel.primaryCategory,
      sub_category: reel.subCategory,
      region: reel.region,
      lat: reel.lat,
      lng: reel.lng,
      votes: reel.votes || 0,
      rating: reel.rating || 5,
      shared_by: reel.sharedBy || '단톡방',
      is_favorite: reel.isFavorite || false
    });
  } catch (err) {
    console.error('Supabase addReel error:', err);
  }
}

// Vote for a reel
export async function voteReelInDb(reelId, newVotes) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('reels').update({ votes: newVotes }).eq('id', reelId);
  } catch (err) {
    console.error('Supabase vote error:', err);
  }
}

// Toggle favorite
export async function toggleFavoriteInDb(reelId, isFavorite) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('reels').update({ is_favorite: isFavorite }).eq('id', reelId);
  } catch (err) {
    console.error('Supabase favorite error:', err);
  }
}

// Delete reel
export async function deleteReelFromDb(reelId) {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from('reels').delete().eq('id', reelId);
  } catch (err) {
    console.error('Supabase delete error:', err);
  }
}
